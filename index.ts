import { Read } from './MikroORM'

Read()
  .then((_) => console.log('Create query'))
  .catch((error) => console.log(error))
