import React from 'react'
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
  Filter,
  SearchInput
} from 'react-admin';

const PostFilter = props => (
  <Filter {...props}>
    <SearchInput source="id" />
    <SearchInput source="title" />
    <SearchInput source="description" />
  </Filter>
);

const PostList = (props) => {  
  return (
    
    <List {... props} filters={<PostFilter />} >
      <Datagrid rowClick="show">
        <TextField source='id' />
        <TextField source='title' />
        <TextField source='description' />
        <EditButton basepath='posts'/>
        <DeleteButton basepath='posts'/>
      </Datagrid>
    </List>
  )
}

export default PostList;