# Need of Hook or useState() Hook

- Variables get updated but not relfect inside UI, to relfect them in UI at muitple places will be tough job only using JS by document.query....
- So we need useState() hook
# 

## useState() 
```javascript 
import { useState } from 'react';
// Syntax

const [state, setState] = useState(intialState);
```

- useState() returns an array with exaclty two values
- setState is a function which changes the value of state
#
## ✅ When to use useState():
Use it whenever you want to store a value that changes over time and should update the UI, such as:

- Counters

- Form inputs

- Toggle states

- API responses