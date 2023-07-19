# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
morah  = User.create(email: "morah@gmail.com", username:"morah", password: "123456", password_confirmation: "123456", role: "admin")
User.create(email: "paul@gmail.com", username:"paul", password: "123456", password_confirmation: "123456")
User.create(email: "chinwe@gmail.com", username:"chinwe", password: "123456", password_confirmation: "123456")
morah.joined_rooms << Room.create(name: "Ruby", is_private:false)
morah.joined_rooms << Room.create(name: "Peace", is_private:false)