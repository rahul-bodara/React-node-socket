export const getUser = () => {
    return  { user : localStorage.getItem('username') ,
    role : localStorage.getItem('role')}
}