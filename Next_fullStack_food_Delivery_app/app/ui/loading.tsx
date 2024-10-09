import CircularProgress from '@mui/material/CircularProgress';
import { orange } from '@mui/material/colors';

export default function Loading() {
    return <div className="flex justify-center items-center h-screen">
        <CircularProgress
          sx={{
            color: orange[600],
            fontSize: 30,
          }}
        />
      </div>
};
