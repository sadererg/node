import {Router} from 'express'
import {getAll, create, remove} from '../controllers/servers1.js'
const router = Router()

router.get('/api/server1', getAll)

router.post('/api/server1', create)

router.delete('/api/server1/:id', remove)

export default router
