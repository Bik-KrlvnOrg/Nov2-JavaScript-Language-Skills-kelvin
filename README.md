# Nov2-JavaScript-Language-Skills-kelvin

## Notables: 
The first call to the API will contain no message body. 
You're to return an actionset that depicts a MENU available to the caller of the program. 
What the userreturns determines what the next flow/action of the program will be. 
The session_id will be the same for every session or action flow. 
You're topersist or store state pertaining to the flow using the session_id.
The message field of the request will contain data in cases where you request for datafrom the user. 
You're to build three user flows or guides using the above Premise:  
1. Register the user collecting their (Name, password). 
Persist state to anin-memory structure.  
1. Return options on fruits users can purchase. Users must be registered topurchase a fruit.
Every fruit purchased must be recorded in account by the user. 
1. Return user's purchase history.

# Run application
```bash
usr@user:~$ yarn start
```

# Run test
```bash
usr@user:~$ yarn test
```
