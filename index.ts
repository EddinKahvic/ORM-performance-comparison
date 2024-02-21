import { Create } from './MikroORM'

Create()
  .then((_) => console.log('Create query'))
  .catch((error) => console.log(error))
