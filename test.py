from ai_engine import UAgentResponse, UAgentResponseType
from pydantic import Field
    
class Message(Model):
    value: str

class Request(Model):
    item: str = Field(description="What do you want to order?")
 
order_protocol = Protocol("E-commerce Website")
 
@order_protocol.on_message(model=Request)
async def take_order(ctx: Context, sender: str, msg: Request):
    amount = 1 # amt of the item
    message = f"You have bought {amount} {msg.item}"
    await ctx.send(
        'agent1qvpd7hf852t0xz5ad0p3pgflnqg4kym8ajncyxv6r56ez85ue8zgumwwjd4', Message(value=msg.item) 
    )
    # await ctx.send(
    #     sender, UAgentResponse(message=message, type=UAgentResponseType.FINAL)
    # )

agent.include(order_protocol)