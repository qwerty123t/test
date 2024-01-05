import React, { ChangeEvent } from 'react'

interface Param {
  id: number;
  name: string;
  type: string;
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
}

interface Props {
  params: Param[];
  model: Model;
}

interface State {
  paramValues: ParamValue[];
}



class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      paramValues: props.model.paramValues.slice(),
    };
  }

  private handleParamChange = (paramId: number, value: string) => {
    const { paramValues } = this.state;
    const updatedValues = paramValues.map((param) =>
      param.paramId === paramId ? { ...param, value } : param
    );

    this.setState({ paramValues: updatedValues });
  };

  public getModel(): Model {
    return { paramValues: this.state.paramValues };
  }

  render() {
    const { params } = this.props;
    const { paramValues } = this.state;

    return (
      <>


        {params.map((param) => (
          <div key={param.id}>
            <label>{param.name}:</label>
            <input
              type="text"
              value={paramValues.find((p) => p.paramId === param.id)?.value || ''}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                this.handleParamChange(param.id, e.target.value)
              }
            />
          </div>
        ))}

        
          <strong>Текущие значения:</strong>
          {paramValues.map((param) => (
            <div key={param.paramId}>
              {`${param.paramId}: ${param.value}`}
            </div>
          ))}

      </>
    );
  }
}


const App: React.FC = () => {
  const params = [
    { id: 1, name: 'Назначение', type: 'string' },
    { id: 2, name: 'Длина', type: 'string' },
  ];

  const model = {
    paramValues: [
      { paramId: 1, value: 'повседневное' },
      { paramId: 2, value: 'макси' },
    ],
  };

  return (
    <ParamEditor params={params} model={model} />
  );
};

export default App;