import { Button, Grid2, Fab } from "@mui/material";

interface TestPanelProps {
  onSearch: (inputValue: string) => void; // Function to handle search with the input value
}

const TestPanel: React.FC<TestPanelProps> = ({ onSearch }) => {
  // Trigger the search function with the current input value
  const handleSearch1: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    // console.log("button: ", event.button.valueOf());
    onSearch("https://www.reddit.com/r/Denver/comments/180jqeh" + ".json");
  };
  const handleSearch2: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    onSearch(
      "https://www.reddit.com/r/Bozeman/comments/1binuhn/traveling_to_bozeman" +
        ".json",
    );
  };
  const handleSearch3: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    onSearch(
      "https://www.reddit.com/r/Denver/comments/1312ptq/what_are_some_good_coffee_shops_to_work_out_of" +
        ".json",
    );
  };

  return (
    <div>
      <Grid2 container direction="column" spacing={2}>
        {/* <Grid2> */}
        <Button variant="contained" onClick={handleSearch3}>
          Denver Small
        </Button>
        {/* </Grid2>
        <Grid2> */}
        <Button variant="contained" onClick={handleSearch1}>
          Denver Large
        </Button>
        {/* </Grid2>
        <Grid2> */}
        <Button variant="contained" onClick={handleSearch2}>
          Bozeman Med
        </Button>
        {/* </Grid2> */}
      </Grid2>
    </div>
  );
};

export default TestPanel;
