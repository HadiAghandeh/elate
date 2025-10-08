import {Button, Card, CardContent, Typography} from "@mui/material";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

export function SideBarAlert() {
    return <Card variant="outlined" sx={{ m: 1.5, flexShrink: 0 }}>
      <CardContent>
        <AutoAwesomeIcon fontSize="small" />
        <Typography gutterBottom sx={{ fontWeight: 600 }}>
          Hey!
        </Typography>
        <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
          Enjoy your platform
        </Typography>
        <Button variant="contained" size="small" fullWidth>
          Do something
        </Button>
      </CardContent>
    </Card>;
}