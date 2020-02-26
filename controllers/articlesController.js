const { Articles, MockChange } = require('../models/articleSchema');

// MockChange()

let cache = Articles.find()

let pubSub = {
  listeners: {},

  sub(func) {
    const random = (num = Math.random()) => {
      if(this.listeners[num] !== undefined) return random(Math.random())
      return num
    }

    let num = random()

    this.listeners[num] = func
    return num
  },

  emit(data) {
    Object.keys(this.listeners).forEach((key) => {
      this.listeners[key] && this.listeners[key](data)
    })
  },

  unsub(id) {
    this.listeners[id] = undefined
  }
}


exports.getFew = async (req, res) => {
  const data = res.locals.data;

  if(data.page > 0) {
    data['skip'] = (data.page * data.limit)
  }

  console.log('getFew', data)

  let count = Articles.countDocuments()

  let articles = Articles.find()
      .skip(data.skip)
      .limit(data.limit)
      .exec()

  articles  = await articles
  count     = await count
  
  let requestPage = count / data.limit

  let obj = {
    count,
    page: data.page,
    limit: data.limit,
    articles
  }

  res.writeHead(200, {
    'Connection': 'keep-alive',
    'Content-Type': 'text/event-stream; charset=utf-8',
    'Cache-Control': 'no-cache',
    'Transfer-Encoding': 'chunked'
  })
  
  res.write(`event: get\ndata: ${JSON.stringify(obj)}\n\n`);

  `
    Get page
      Is last?               -> sub on add events
      On which page changed? -> logic in put
        
    Add -> count pages -> pub last
    
    GET -> Count pages + Get req page + Sub on put & Delete
      on PUT -> Count PUT page from requsets with different size ?
    
    
    id as index;
                
  `;

  function ifThisPageSended(id) {
    let if1 = id - data.skip > -1
    let if2 = id - (data.skip + data.limit) < 0

    // console.log(id + ' n ' + arr[id], if1, if2)
    if(if1 && if2) {
      // console.log(arr[id])
      return true
    }
    return false
  }
  
  let actions = {
    add(obj) {
      
      // if lastPage
      count - (data.skip + data.limit) < 0 ?
        res.write(`event: add\ndata: ${JSON.stringify(obj)}\n\n`) :
        res.write(`event: add\ndata: ${JSON.stringify({last: true})}\n\n`)
      // else send num
      
      count++
    },

    put(obj) {
      // if this page
      let index = obj._id
      obj.index = index
      ifThisPageSended(index) ?
        res.write(`event: update\ndata: ${JSON.stringify(obj)}\n\n`) : null
    },

    del(obj) {
      // if this page
      // todo : Is shifted?
      let index = obj._id
      
      // console.log('data', articles[index])
      ifThisPageSended(index) ?
        res.write(`event: delete\ndata: ${JSON.stringify({ index })}\n\n`) :
          index <= data.skip ?
            res.write(`event: delete\ndata: ${JSON.stringify({shift: true, data: cache[index]})}\n\n`) :
            res.write(`event: delete\ndata: ${JSON.stringify({shift: false})}\n\n`)
      
      count--
    }
  }
  
  function handleSSE(obj) {
    console.log('SSE', obj.action, obj.data._id)
    if (!res.finished) {
      actions[obj.action](obj.data)
    }  
  }
  
  let id = pubSub.sub(handleSSE)
  
  req.on('close', () => {
    console.log('unsub')
    res.end()
    pubSub.unsub(id)
  });  
};

function test() {
  
  const timer = 100

  function put(i = 0) {
    function int() {
      let obj = {
        _id: i,
        title: i + 1,
        body: i
      }
      
      pubSub.emit({ action: 'put', data: obj })
      i++
      
      if(i === 10) {
        clearInterval(this)
        del()
      }
    }
    
    setInterval(int, timer)
  }

  function add(i = 0) {    
    function int() {
      let obj = {
        _id: i,
        title: i,
        body: i
      }
      // events.emit(`SSE`, { action: 'add', data: obj })
      pubSub.emit({ action: 'add', data: obj })
      i++
      // console.log(ii)
      if(i === 10) {
        clearInterval(this)
        // put()
        del()
      }
    }

    setInterval(int, timer)
  }

  function del(i = 0) {
    function int() {
      let obj = {
        _id: i,
        title: i,
        body: i
      }
      pubSub.emit({ action: 'del', data: obj })
      i++
      
      if(i === 10) {
        clearInterval(this)
        add()
      }
    }

    setInterval(int, timer)
  }
  add() // add++(1) -> put--(10) -> del++(1) -> 
  // del()
}

test()

exports.putOne = (req, res) => {
  Writable.get(req.params.id) 
    .exec((err, article) => {
      if(err) {
        res.status(500).end();
        console.log("err", err);
        return;
      }
      article['title'] = req.body.title;
      article['body'] = req.body.body;
      article['updated_at'] = new Date();
      
      article.save((saveErr, updatedFile) => {
          res.send({ updated_to: updatedFile });
          events.emit('put', { index: req.body.index, data: updatedFile })
      });
  });
};

exports.postOne = (req, res) => {
  let article = new Writable({
    title: req.body.title,
    body: req.body.body,
    created_at: new Date()
  });
  article.save((err, data) => {
    if(err) {
      res.status(500).end();
      return
    }

    res.send({
      created: data
    })
    events.emit('add', data)
  });
};

exports.deleteOne = async (req, res) => {
  let resp = await Writable.delete(req.body.id)
  res.send(resp)
  events.emit('delete', {index: req.query.index, id: req.body.id})
}