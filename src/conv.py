# import the readline module for the terminal interface
import readline

# define a function to handle the conversation with the user
def handle_conversation(message):
    # check if the message is a greeting
    if message.lower() in ["hi", "hello", "hey"]:
        # if it is a greeting, return a greeting response
        return "Hello, how are you?"

    # check if the message is a question
    if message.lower() == "how are you":
        # if it is a question, return a response
        return "I'm doing well, thank you. How are you?"

    # if the message is none of the above, return a default response
    return "I'm sorry, I don't understand. Can you please rephrase your question?"

# prompt the user for the initial message
message = input("Enter your message: ")

# handle the conversation with the user
response = handle_conversation(message)

# print the response to the console
print(response)

# prompt the user for the next message
message = input("Enter your next message: ")

# handle the conversation with the user
response = handle_conversation(message)

# print the response to the console
print(response)

# close the terminal interface when the conversation is finished
readline.rl.mode.restore()
