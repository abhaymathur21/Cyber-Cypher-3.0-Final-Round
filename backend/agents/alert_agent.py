from uagents import Agent, Context, Model
from uagents.query import query
from uagents.setup import fund_agent_if_low
import requests

class Message(Model):
    product: str
    quantity: str

alert_agent = Agent(
    name="alert_agent",
    seed="alert_agent_seed",
    port=8002,
    endpoint=["http://127.0.0.1:8002/submit"],
)

print(alert_agent.address)

@alert_agent.on_message(model=Message)
async def handle_message(ctx:Context,sender:str, msg: Message):
    ctx.logger.info(f"{msg.product} is low in stock, restock {msg.quantity} units")

if __name__ == "__main__":
    fund_agent_if_low(alert_agent.wallet.address())
    alert_agent.run()