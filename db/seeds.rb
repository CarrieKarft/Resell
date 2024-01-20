# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
puts "seeding..."

User.create({username: 'ckraft', password: 'ckraft', password_confirmation: 'ckraft', email: 'ctownsend33@gmail.com'})
User.create({username: 'ekraft', password: 'ekraft', password_confirmation: 'ekraft', email: 'carriekarft@gmail.com'})
User.create({username: 'dougie', password: 'dougie', password_confirmation: 'dougie', email: 'dtownsend33@gmail.com'})

10.times do 
    Product.create({ description: Faker::Lorem.paragraphs, minimum_price: rand(10.00..100.00).round(2)})
end

User.all.each do |user|
    rand(1..4).times do
        user.comments.create({product_id: rand(1..10), comment: Faker::Lorem.sentence})
    end
end

User.all.each do |user|
    rand(1..4).times do
        user.bids.create({product_id: rand(1..10), bid_amount: rand(10.00..60.99).round(2), bid_accepted: false})
    end
end





puts "done seeding!"
