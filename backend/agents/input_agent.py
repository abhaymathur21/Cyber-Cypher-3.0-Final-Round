from uagents import Agent, Context, Model
from uagents.setup import fund_agent_if_low

class Message(Model):
    product: str
    quantity: str
    
input_agent = Agent(
    name="input_agent",
    seed="input_agent_seed",
    port=8001,
    endpoint=["http://127.0.0.1:8001/submit"],
)
print(input_agent.address)

@input_agent.on_query(model=Message)
async def handle_query(ctx:Context,sender:str, msg: Message):
    product = msg.product
    quantity = msg.quantity
    print(product,quantity)
    await ctx.send("agent1qde9dwqkl6dj0glmj8kfhfg8q99q6pcw3vgfpzpzjewrjeg70p3kjwms6y6", Message(product=product,quantity=quantity)) # goes to database agent

if __name__ == "__main__":
    fund_agent_if_low(input_agent.wallet.address())
    input_agent.run()