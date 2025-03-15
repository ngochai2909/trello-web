import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'
import {
  Button,
  Card as MuiCard,
  CardActions,
  CardContent,
  CardMedia,
  Typography
} from '@mui/material'

function Card() {
  return (
    <MuiCard
      sx={{
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0,0,0,0.2), 0 2px 2px rgba(0,0,0,0.12), ',
        overflow: 'unset'
      }}
    >
      <CardMedia
        sx={{ height: 140 }}
        image='https://scontent.fhan5-2.fna.fbcdn.net/v/t39.30808-6/477943168_2406293513038133_8698001168044826872_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEIDfZJdb2Go2XlNNTc85ZmXPHllKimxsZc8eWUqKbGxns_QCX-sB8MmAESR_FvjWkN8cJXAcVGa_Pm1ERzPdNE&_nc_ohc=rJ0siRgTtKYQ7kNvgE2T5YI&_nc_oc=Adg8BbUOrIql7XpYVcDHgUJjhIm3A0xs5t-6k-mMqDJdC_UWk67YixJBMdDAkWItOTE&_nc_zt=23&_nc_ht=scontent.fhan5-2.fna&_nc_gid=APbv56X_qaeeXWJN7IvG0hZ&oh=00_AYH_VhiDvahGZ8I6iaBAu-uXgSaxmuvitAmV5yAOO8anMQ&oe=67D9D93A'
        title='green iguana'
      />
      <CardContent
        sx={{
          p: 1.5,
          '&:last-child': {
            p: 1.5
          }
        }}
      >
        <Typography>Hai Nguyen Mern Stack</Typography>
      </CardContent>
      <CardActions
        sx={{
          p: '0 4px 8px 4px'
        }}
      >
        <Button startIcon={<GroupIcon />} size='small'>
          20
        </Button>
        <Button startIcon={<CommentIcon />} size='small'>
          15
        </Button>
        <Button startIcon={<AttachmentIcon />} size='small'>
          10
        </Button>
      </CardActions>
    </MuiCard>
  )
}

export default Card
