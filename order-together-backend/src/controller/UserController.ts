import gDB from "../initDataSource";
import {UserEntity} from "../entity/user.entity";
import {Request, Response} from 'express'
import {uid} from "uid";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const repo = gDB.getRepository(UserEntity)
const saltRounds = +process.env.BCRYPT_SALT
class UserController {

    static async checkUsernameExistence(request: Request, response: Response) {
        const {username} = request.query
        const usernameStr = username as string
        // check if user is already existing
        try {
            const existingUser = await repo.findOne({where: {username: usernameStr}})
            if (existingUser) {
                return response.status(200).send({
                    existed: true,
                    message: 'Username is already existed.'
                })
            } else {
                return response.status(200).send({
                    existed: false,
                    message: 'Username is available.'
                })
            }
        } catch (e) {
            return response.status(500).send({message: 'Error during checking email existence in the database.'})
        }
    }
    static async signup(request: Request, response: Response) {
        const {username, password} = request.body

        // check if username and password are provided
        if (!username || !password) {
            return response.status(404).send({message: 'Username and Password must be provided'})
        }

        // check if user is already existing
        const existingUser = await repo.findOne({where: {username: username}})
        if (existingUser) {
            return response.status(404).send({message: 'Username already in use.'})
        }

        const user = new UserEntity()
        user.username = username
        user.uid = uid()

        // hash the password
        try {
            const hashedPassword = await bcrypt.hash(password, saltRounds)
            user.password = hashedPassword

            await repo.save(user)
        } catch (e) {
            return response.status(500).send({message: 'Error saving user to the database.'})
        }

        return response.status(201).send({message: 'User successfully created.'})
    }

    static async login(request: Request, response: Response) {
        const {username, password} = request.body

        // Check if email and password are provided
        if (!username || !password) {
            return response.status(404).send({message: 'Bad Request'})
        }

        try {
            // Check if user exists
            const user = await repo.findOne({where: {username: username}})

            if (!user) {
                return response.status(404).send({message: 'User does not exist'})
            }

            if (user.isDelete) {
                return response.status(404).send({message: 'Account has been deleted. Please contact admin.'})
            }

            if (!user.isActive) {
                return response.status(404).send({message: 'Account is not activated. Please contact admin.'})
            }

            // Compare provided password with stored hashed password
            const isValidPassword = await bcrypt.compare(password, user.password)
            if (!isValidPassword) {
                return response.status(404).send({message: 'Incorrect username or password'})
            }

            if (isValidPassword) {
                const token = jwt.sign(
                    {
                        userUId: user.uid,
                        username: user.username,
                        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 2
                    },
                    process.env.JWT_SECRET
                )
                // Login successful,send user info to frontendd
                return response.status(200).send({message: 'Login successful', user, token: token})
            } else {
                return response.status(404).send({message: 'Login failed'})
            }
        } catch (e) {
            return response.status(500).send({message: 'Error logging in'})

        }
    }

    static async updateUserInfo(request: Request, response: Response) {
        const { userId, firstName, lastName, age, phone, street, city, postcode } = request.body;

        if (!userId) {
            return response.status(400).send({ message: 'User ID is required.' });
        }

        try {
            const user = await repo.findOne({ where: { uid: userId } });

            if (!user) {
                return response.status(404).send({ message: 'User not found.' });
            }

            user.firstName = firstName;
            user.lastName = lastName;
            user.age = age;
            user.phone = phone;
            user.street = street;
            user.city = city;
            user.postcode = postcode;

            await repo.save(user);

            return response.status(200).send({ message: 'User information updated successfully.', user });
        } catch (e) {
            return response.status(500).send({ message: 'Error updating user information.' });
        }
    }

}

export default UserController