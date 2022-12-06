from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, jwt_required, create_access_token

# create a Flask app
app = Flask(__name__)

# define the secret key used to sign the JWT tokens
app.config["JWT_SECRET_KEY"] = "supersecretkey"

# create a JWT manager for the app
jwt = JWTManager(app)

# define a function to generate JWT tokens
def generate_token(username):
    # create the JWT payload containing the username
    payload = {
        "username": username
    }

    # create the JWT token and return it
    return create_access_token(payload)

# define a route to authenticate users
@app.route("/auth", methods=["POST"])
def auth():
    # get the username and password from the request body
    username = request.json.get("username")
    password = request.json.get("password")

    # check if the username and password are correct
    if username == "admin" and password == "password":
        # if correct, generate a JWT token and return it
        token = generate_token(username)
        return jsonify({"token": token})
    else:
        # if incorrect, return an error
        return jsonify({"error": "Invalid username or password"}), 401

# define a protected route that requires authentication
@app.route("/secret", methods=["GET"])
@jwt_required
def secret():
    # get the username from the JWT token
    username = get_jwt_identity()

    # return the username
    return jsonify({"username": username})

# run the app
if __name__ == "__main__":
    app.run(debug=True)
