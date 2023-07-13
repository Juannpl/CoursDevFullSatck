import React from 'react';
import { Edit, ReferenceInput, SimpleForm, TextInput } from 'react-admin';

const PostEdits = (props) => {

  return (
    <Edit {...props}>
      <SimpleForm>
          <TextInput source='title' />
          <TextInput source='description' />
          <ReferenceInput source='users_id' reference='users'/>
      </SimpleForm>
    </Edit>
  )
}

export default PostEdits;