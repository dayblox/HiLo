import { Grid } from "@mui/material"
import Controls from "../src/components/Controls"
import Table from "../src/components/Table"

const Home = () => {
  return (
    <Grid container>
      <Grid item>
        <Table />
      </Grid>
      <Grid item xs>
        <Controls />
      </Grid>
    </Grid>
  )
}

export default Home
