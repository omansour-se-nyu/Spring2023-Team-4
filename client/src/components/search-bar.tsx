import { Paper, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar({
  setKeyword,
}: {
  setKeyword: (keyword: string[]) => void;
}) {
  return (
    <Paper sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Products"
        onKeyDown={(e) => {
          if (e.key == 'Enter') {
            setKeyword(e.target.value);
          }
        }}
      />
      <IconButton
        sx={{ p: '10px' }}
        onClick={() => {
          setKeyword(e.target.value);
        }}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
