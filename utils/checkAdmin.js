

module.exports = (ctx , next) =>{
  try{
    const { isAdmin } = ctx.state.user
    if(!isAdmin){
      return ctx.body = { code:401, message:"权限不足！！" }
    }
    else{
      return  next()
    }
  }
  catch (err){
      console.error(err)
  }
}