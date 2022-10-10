import { useEffect, useState } from 'react';
import { IonSearchbar, IonContent, IonAvatar, IonItem, IonLabel,IonList,IonLoading, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/react';
import HttpService from '../api/http';
import { IUsersItem } from '../interface/interface';
import './users.css';
import { IoMdGlobe } from "react-icons/io";

interface UserState {
    loading: boolean,
    list: IUsersItem,
    filterList: IUsersItem
}

const Users: React.FC = () => {
    //  set store
    const [state, setState] = useState({
        loading: false,
        list: [],
        filterList: []
    });

    // create http client
    const httpClient = new HttpService();
    // how to handel side effects
    useEffect(() => {
        // api url https://dummyjson.com/users
        httpClient.get('users')
            .then((data: any) => {
                setState(state => {
                    return {
                        ...state,
                        loading: false,
                        list: data.users,
                        filterList: data.users
                    };
                })
            })
    }, []);

    const handleChange = (ev: Event) => {
        let query = "";
        const target = ev.target as HTMLIonSearchbarElement;
        if (target) query = target.value!.toLowerCase();
        setState(state => {
            return {
                ...state,
                filterList: state.list.filter((user: IUsersItem) => {
                    return user.firstName.toLowerCase().indexOf(query) > -1 
                    || user.lastName.toLowerCase().indexOf(query) > -1
                })
            }
        })

      }

    // functions
    const navUserProfile = (user: IUsersItem) => {
        alert(user.firstName);
    }

    return (
        <>
            <IonLoading
                cssClass='my-custom-class'
                isOpen={state.loading}
                message={'Please wait...'}
                duration={5000}
            />

            <IonSearchbar debounce={1000} onIonChange={(ev) => handleChange(ev)}></IonSearchbar>
            <IonContent
                className="ion-padding"
                scrollEvents={true}
                onIonScrollStart={_e => {
                    console.log(_e);
                }}
                onIonScroll={() => { }}
                onIonScrollEnd={() => { }}
            >
                <IonInfiniteScroll>
                    <IonInfiniteScrollContent>
                        <IonList>
                            {state.filterList.length > 0 ? state.filterList.map((user: IUsersItem) =>
                                <IonItem key={user.id} onClick={() => navUserProfile(user)}>
                                    <IonAvatar slot="start">
                                        <img alt="Silhouette of a person's head" src={user.image} />
                                    </IonAvatar>
                                    <IonLabel>
                                        {user.firstName}  {user.lastName} <span><IoMdGlobe /></span>
                                    </IonLabel>
                                </IonItem>
                            ) : (
                                <IonCard>
                                    <IonCardHeader>
                                        <IonCardTitle>No Search Results Found</IonCardTitle>
                                    </IonCardHeader>
                                    <IonCardContent>
                                        Please try typing in another search
                                    </IonCardContent>
                                </IonCard>
                            )}
                        </IonList>

                    </IonInfiniteScrollContent>
                </IonInfiniteScroll>
            </IonContent>
        </>);
}

export default Users;