# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

user_data = {}
user_data[:username] = 'genesis'
user_data[:password] = '123456789'
user_data[:email] = 'test@test.test'

user1 = User.create(user_data)

l1 = Learning.create(
  name: 'Pokemon Master',
  motivation: 'To become the very best like no one ever was',
  user: user1
)

l2 = Learning.create(
  name: 'Basic Programming',
  motivation: "I'm interested to know how programs work but I gotta start from scratch!",
  user: user1
)

l3 = Learning.create(
  name: 'Eating Healthy',
  motivation: 'Food is delicious but eating junk all the time brings down my energy levels. Not to mention I look a tiiinnyyy bit chubby... big sad',
  user: user1
)

l4 = Learning.create(
  name: 'How to Train a Dragon',
  motivation: 'I saw the movie and I thought to myself I want to be just like that guy one day, probably not any time soon though what a dweeb.',
  user: user1
)

l5 = Learning.create(
  name: 'How to document goodly, et al',
  motivation: "It turns out a lot of the things I do don't get written down or anything so a lot of things I do are forgotten to time and space.",
  user: user1
  )

l6 = Learning.create(
  name: 'Colour Theory',
  motivation: 'Everyone else seems to have a really good sense of colour, making better looking schemes than myself :(',
  user: user1
)

l7 = Learning.create(
  name: 'Losing Weight',
  motivation: "Wouldn't it be nice if I could eat tons, but not pack on the pounds? The answer is yes, the question is how?!",
  user: user1
)

l1_h1 = Heading.create(name: 'Summary', learning: l1)
l1_h2 = Heading.create(name: 'Throwing Pokeballs', learning: l1)

l2_h1 = Heading.create(name: 'Summary', learning: l2)
l2_h2 = Heading.create(name: 'Basics', learning: l2)

l3_h1 = Heading.create(name: 'Summary', learning: l3)
l3_h2 = Heading.create(name: 'Better food choices', learning: l3)

l4_h1 = Heading.create(name: 'Summary', learning: l4)
l4_h2 = Heading.create(name: 'Dragons, how do they work?', learning: l4)

l5_h1 = Heading.create(name: 'Summary', learning: l5)
l5_h2 = Heading.create(name: 'Why should we document things', learning: l5)

l6_h1 = Heading.create(name: 'Summary', learning: l6)
l6_h2 = Heading.create(name: 'Colours from real world to canvas', learning: l6)

l7_h1 = Heading.create(name: 'Summary', learning: l7)
l7_h2 = Heading.create(name: 'Is dieting safe', learning: l7)

h1_n1 = Note.create(heading: l1_h1, content: 'Summaryyy - Sunt minim do dolor velit occaecat elit quis ad ea et nulla dolore. Incididunt commodo elit aliqua amet enim eiusmod deserunt consectetur eiusmod ipsum cupidatat mollit mollit duis. Adipisicing dolor magna tempor aliquip id.')
h2_n1 = Note.create(heading: l2_h1, content: 'Summaryyy - Sunt minim do dolor velit occaecat elit quis ad ea et nulla dolore. Incididunt commodo elit aliqua amet enim eiusmod deserunt consectetur eiusmod ipsum cupidatat mollit mollit duis. Adipisicing dolor magna tempor aliquip id.')
h3_n1 = Note.create(heading: l3_h1, content: 'Summaryyy - Sunt minim do dolor velit occaecat elit quis ad ea et nulla dolore. Incididunt commodo elit aliqua amet enim eiusmod deserunt consectetur eiusmod ipsum cupidatat mollit mollit duis. Adipisicing dolor magna tempor aliquip id.')
h4_n1 = Note.create(heading: l4_h1, content: 'Summaryyy - Sunt minim do dolor velit occaecat elit quis ad ea et nulla dolore. Incididunt commodo elit aliqua amet enim eiusmod deserunt consectetur eiusmod ipsum cupidatat mollit mollit duis. Adipisicing dolor magna tempor aliquip id.')
h5_n1 = Note.create(heading: l5_h1, content: 'Summaryyy - Sunt minim do dolor velit occaecat elit quis ad ea et nulla dolore. Incididunt commodo elit aliqua amet enim eiusmod deserunt consectetur eiusmod ipsum cupidatat mollit mollit duis. Adipisicing dolor magna tempor aliquip id.')
h6_n1 = Note.create(heading: l6_h1, content: 'Summaryyy - Sunt minim do dolor velit occaecat elit quis ad ea et nulla dolore. Incididunt commodo elit aliqua amet enim eiusmod deserunt consectetur eiusmod ipsum cupidatat mollit mollit duis. Adipisicing dolor magna tempor aliquip id.')
h7_n1 = Note.create(heading: l7_h1, content: 'Summaryyy - Sunt minim do dolor velit occaecat elit quis ad ea et nulla dolore. Incididunt commodo elit aliqua amet enim eiusmod deserunt consectetur eiusmod ipsum cupidatat mollit mollit duis. Adipisicing dolor magna tempor aliquip id.')

t1 = Tag.create(name: 'Main', deletable: false, user_id: user1.id)

t1.learnings << [l1, l2, l3, l4, l5, l6, l7]

Tag.create(name: 'Completed', deletable: false, user_id: user1.id)
Tag.create(name: 'Test', deletable: false, user_id: user1.id)