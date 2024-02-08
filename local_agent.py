from uagents import Agent, Context, Model, Protocol
from uagents.setup import fund_agent_if_low
from uagents.query import query
import requests

class Message(Model):
    value: str
    
    
local_agent = Agent(
    name="local_agent",
    seed="local_agent_seed",
    port=8001,
    endpoint=["http://127.0.0.1:8001/submit"],
)
# print(local_agent.address)

 
@local_agent.on_event("startup")
async def hi(ctx: Context):
    ctx.logger.info(local_agent.address)

 
@local_agent.on_message(model=Message)
async def take_order(ctx: Context, sender: str, msg: Message):
    await ctx.logger.info(msg.value)
    
if __name__ == "__main__":
    fund_agent_if_low(local_agent.wallet.address())
    local_agent.run()