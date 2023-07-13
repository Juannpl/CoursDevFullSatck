import React from 'react'
import { Create, ReferenceInput, SimpleForm, TextInput } from 'react-admin'

const PostCreate = (props) => {
  return (
    <Create {...props}>
      <SimpleForm>
          <TextInput source='title' />
          <TextInput source='description' />
          <ReferenceInput source='users_id' reference='users'/>
      </SimpleForm>
    </Create>
  )
}

export default PostCreate;