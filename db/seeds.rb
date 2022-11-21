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
subject = Subject.create(
  name: 'Music',
  description: 'I wana be, the very best. Like no one ever was.',
  user_id: user1.id
)
topic = Topic.create(
  name: 'Reading Music Notation',
  description: 'How to properly read music notation, my ABCs',
  subject_id: subject.id
)
note = Note.create(
  content: 'oihaeg ioeghoie gioagragawe gang  nag oni ga nioega niogsa noigs noigs noi gs nio gsnoi grnio grn grniga niga in owg n;gangn snv;lsn; vlkaion gioa weg ioan;gnsdn;osad gnaong oiangov nangv aju enrganerg vrgfuj ar gnhvaepo;iru hgnaiueorhgndnfb  edrg aerg apue rgauioenrg varg aeruog ha[oerhg naoei rhnghnj go ahergo[haer[og haeorg haoer gaongvjaerg ohnaerg[o nar[eonhg a[oehnrg [aohnerg[o naheo[fbvna[oirng [aonsfdvoa nfdvoiha [rweoighn a;lfhsndgviobadnfg[io nahs[eoir ghnasoiu nhfg [ounadfo[ugb nad[oigbnha[rujikg  na[do gbva]srfga[rehng ah[r giaher [goi ae[ hoirg[ahioer hg[a[eoihrg[har[hgoia[hoireg ohiar hgioa hi[org h[iaerg h[ioarghi[ [aiohrg[ ae[ rg[hoar[ goiasr ;gnarnbv; abnerigae[rgaer[',
  topic_id: topic.id
)
resource = Resource.create(
  url: 'http://letmegooglethatforyou.com',
  topic_id: topic.id
)
