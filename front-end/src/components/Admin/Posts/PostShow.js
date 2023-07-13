import { DateField, ReferenceField, Show, SimpleShowLayout, TextField } from 'react-admin';
import React from 'react';

const PostShow = () => {

    return (
        <Show>
            <SimpleShowLayout>
                <TextField source="id" />
                <TextField source="title" />
                <TextField source="description" />
                <ReferenceField source='users_id' reference='users'/>
                <DateField source="createdAt" />
                <DateField source="updatedAt" />
            </SimpleShowLayout>
        </Show>
    )
};

export default PostShow;
