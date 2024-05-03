import { IUser } from "../interfaces/UserInterface";

export class UserRepositoryInMemory {
    users: IUser[] = [];
    
    async create({ name, email, password } : Omit<IUser, "id">) : Promise<IUser> { 
        const user: IUser = {
            id: Math.floor(Math.random() * 1000) + 1,
            email,
            name, 
            password
        }

        this.users.push(user);

        return user;
    }

    async findByEmail(email: string) : Promise<IUser | undefined> {
        return this.users.find(user => user.email === email);
    }

    async findById(id: number) : Promise<IUser | undefined> {
        return this.users.find(user => user.id === id);
    }
}