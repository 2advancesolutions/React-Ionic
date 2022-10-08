import { FunctionComponent, useEffect, useState } from 'react';
import HttpService from '../api/http';
import { IUsersItem } from '../interface/interface';
import './products.css';

const Products: FunctionComponent = () => {

    const [userList, setUserList] = useState<any>([]);
    
    const httpClient = new HttpService();
   
    useEffect(() => {
        httpClient.get('users')
            .then((data: any) => {
                setUserList(data.users);
            })
    }, [])
    return (
        <ul>
            {userList && userList.map((user: IUsersItem) =>
                <div key={user.id}>{user.firstName}</div>
            )}
        </ul>);
}

export default Products;