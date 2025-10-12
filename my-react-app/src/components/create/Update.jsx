import React, { useEffect, useState, useContext } from 'react'
import {Box,Button,FormControl,InputBase,styled, ButtonBase, TextareaAutosize} from '@mui/material'
import { AddCircle as Add, Label} from '@mui/icons-material'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { DataContext} from '../../context/DataProvider'
import API from '../../service/api';
const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    },
}));

const Image = styled('img')({
    width: '100%',
    height: '80vh',
    objectFit: 'cover'
})

const StyledFormControl = styled(FormControl)`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
`;

const InputTextField = styled(InputBase)`
  flex: 1;
  margin: 0 30px;
  flex-direction: row;
`;
const TextArea = styled(TextareaAutosize)`
  width: 100%;
  margin-top:50px;
  font-size: 18px;
  border: none;
  &:focus-visible {
    outline: none;
  }
`;
const initialPost = {
  title: '',
  description: '',
  picture: '',
  username: '',
  categories: '',
  createdDate: new Date()
}

const Update = () => {
    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const { account } = useContext(DataContext);
    const {id} = useParams();
    const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

    useEffect(() => {
        const fetcheData = async ()=>{
            let response = await API.getPostById(id);
            if(response.isSuccess){
                setPost(response.data);
            }
        }
        fetcheData();
    }, [])
    



  
    const handleUpload = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const formData = new FormData();
      formData.append('name', file.name);
      formData.append('file', file);
  
      try {
        const response = await API.uploadFile(formData);
        // console.log(picture.data);
        if (response.data?.imageUrl) {
          setPost(prev => ({
            ...prev,
            picture: response.data.imageUrl
          }));
        }
      } catch (err) {
        console.error('❌ Image upload failed:', err);
      }
    };
  useEffect(() => {
    setPost(prev => ({
      ...prev,
      categories: location.search?.split('=')[1] || 'All',
      username: account.username,
    }));
  }, [location.search, account.username]);
    
    const handleChange=(e)=>{
      setPost({...post, [e.target.name]: e.target.value});
    }

    const updateBlogpost = async ()=>{
      const response = await API.updatePost(post);
      if(response.isSuccess){
        navigate(`/details/${id}`);
      }else{
        console.log("post not created")
      }
    }

  return (
    <Container>
    <Image src={url} alt='banner'/>
    <StyledFormControl>
        <label htmlFor="fileInput">
        <Add fontSize='large' color='action'/>
        </label>
        <input type="file" id='fileInput' style={{display: 'none'}} onChange={handleUpload}/> 
        <InputTextField placeholder='Title' value={post.title} onChange={(e)=>{handleChange(e)}}
      name="title"></InputTextField>
        <Button variant='contained' onClick={()=>{updateBlogpost()}}>Publish</Button>
    </StyledFormControl>
    <TextArea
      minRows={5}
      placeholder='Tell your story...'
      onChange={(e)=>{handleChange(e)}}
      name="description"
      value={post.description}
    />
    </Container>
  )
}

export default Update
