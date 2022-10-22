import Select from 'react-select';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];


  interface Props {
    handleSelect: (newValue:any) => void;
    savedLocation?: string;
  }
  
  const AutocompleteInput = ({ handleSelect }: Props) => {
    // const [inputValue, setInputValue] = useState("");
  
    
  
    return (
      <div style={{width: "610px", margin: "50px auto", position: "relative"}} >
        <Select
          options={options}
          placeholder="Search"
          onChange={(newValue) => handleSelect(newValue)}
          isMulti={false}
          name="capitals"
          inputId="capitals"
        />
      </div>
    );
  };

  export {AutocompleteInput};