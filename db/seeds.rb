# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# Users
User.create!(username: 'chrischris', first_name: 'chris', last_name: 'chris', password: 'password', password_confirmation: 'password' )
User.create!(username: 'tomtom', first_name: 'tom', last_name: 'tom', password: 'password', password_confirmation: 'password' )
User.create!(username: 'zarazara', first_name: 'zara', last_name: 'zara', password: 'password', password_confirmation: 'password' )
User.create!(username: 'frankyfranky', first_name: 'franky', last_name: 'franky', password: 'password', password_confirmation: 'password' )
User.create!(username: 'joejoe', first_name: 'joe', last_name: 'joe', password: 'password', password_confirmation: 'password' )

# Following
Follow.create!(follower_id: '1', following_id: '2')
Follow.create!(follower_id: '1', following_id: '3')
Follow.create!(follower_id: '1', following_id: '4')
Follow.create!(follower_id: '1', following_id: '5')
Follow.create!(follower_id: '2', following_id: '1')
Follow.create!(follower_id: '2', following_id: '3')
Follow.create!(follower_id: '2', following_id: '4')
Follow.create!(follower_id: '2', following_id: '5')
Follow.create!(follower_id: '3', following_id: '1')
Follow.create!(follower_id: '3', following_id: '2')
Follow.create!(follower_id: '3', following_id: '4')
Follow.create!(follower_id: '3', following_id: '5')
Follow.create!(follower_id: '4', following_id: '1')
Follow.create!(follower_id: '4', following_id: '2')
Follow.create!(follower_id: '4', following_id: '3')
Follow.create!(follower_id: '4', following_id: '5')

# Images
User.find(1).images.create!(url: 'http://d5qsyj6vaeh11.cloudfront.net/images/homepage/backgrounds/mayo-rainbow_bg.jpg', lat: '53.2734', long: '9.0489', caption: "When I lost my job, I realized you don/'t need a pot of gold at the end of the rainbow.")
User.find(1).images.create!(url: 'http://images.nationalgeographic.com/wpf/media-live/photos/000/067/cache/pastoral-landscape_6792_600x450.jpg', lat: '53.3428', long: '6.2661', caption: "When I stood in my ancestor/'s backyard, I realized how deep roots grow.")
User.find(1).images.create!(url: 'http://backroads_web.s3.amazonaws.com/images/trips/2013/slideshowsnew/BIRQ-ireland-biking-7.jpg', lat: '52.6675', long: '8.6261', caption: "When I stepped outside my comfort zone, I realized the grass is always greener on this side.")
User.find(1).images.create!(url: 'http://www.hillwalkireland.com/slider/5_Ireland_Hiking_Trips_West_of_Ireland_Walking_Tours.jpg', lat: '52.7106', long: '8.8784', caption: "When I left the city, I realized peace is precious.")
User.find(1).images.create!(url: 'http://www.brideswithoutborders.com/wp/wp-content/uploads/2011/11/ireland.jpg', lat: '52.0599', long: '9.5072', caption: "When I was alone, I realized how transient life is.")
User.find(2).images.create!(url: 'http://d5qsyj6vaeh11.cloudfront.net/images/homepage/backgrounds/mayo-rainbow_bg.jpg', lat: '53.2734', long: '9.0489', caption: "When I lost my job, I realized you don/'t need a pot of gold at the end of the rainbow.")
User.find(2).images.create!(url: 'http://images.nationalgeographic.com/wpf/media-live/photos/000/067/cache/pastoral-landscape_6792_600x450.jpg', lat: '53.3428', long: '6.2661', caption: "When I stood in my ancestor/'s backyard, I realized how deep roots grow.")
User.find(2).images.create!(url: 'http://backroads_web.s3.amazonaws.com/images/trips/2013/slideshowsnew/BIRQ-ireland-biking-7.jpg', lat: '52.6675', long: '8.6261', caption: "When I stepped outside my comfort zone, I realized the grass is always greener on this side.")
User.find(2).images.create!(url: 'http://www.hillwalkireland.com/slider/5_Ireland_Hiking_Trips_West_of_Ireland_Walking_Tours.jpg', lat: '52.7106', long: '8.8784', caption: "When I left the city, I realized peace is precious.")
User.find(2).images.create!(url: 'http://www.brideswithoutborders.com/wp/wp-content/uploads/2011/11/ireland.jpg', lat: '52.0599', long: '9.5072', caption: "When I was alone, I realized how transient life is.")
User.find(3).images.create!(url: 'http://d5qsyj6vaeh11.cloudfront.net/images/homepage/backgrounds/mayo-rainbow_bg.jpg', lat: '53.2734', long: '9.0489', caption: "When I lost my job, I realized you don/'t need a pot of gold at the end of the rainbow.")
User.find(3).images.create!(url: 'http://images.nationalgeographic.com/wpf/media-live/photos/000/067/cache/pastoral-landscape_6792_600x450.jpg', lat: '53.3428', long: '6.2661', caption: "When I stood in my ancestor/'s backyard, I realized how deep roots grow.")
User.find(3).images.create!(url: 'http://backroads_web.s3.amazonaws.com/images/trips/2013/slideshowsnew/BIRQ-ireland-biking-7.jpg', lat: '52.6675', long: '8.6261', caption: "When I stepped outside my comfort zone, I realized the grass is always greener on this side.")
User.find(3).images.create!(url: 'http://www.hillwalkireland.com/slider/5_Ireland_Hiking_Trips_West_of_Ireland_Walking_Tours.jpg', lat: '52.7106', long: '8.8784', caption: "When I left the city, I realized peace is precious.")
User.find(3).images.create!(url: 'http://www.brideswithoutborders.com/wp/wp-content/uploads/2011/11/ireland.jpg', lat: '52.0599', long: '9.5072', caption: "When I was alone, I realized how transient life is.")
User.find(4).images.create!(url: 'http://d5qsyj6vaeh11.cloudfront.net/images/homepage/backgrounds/mayo-rainbow_bg.jpg', lat: '53.2734', long: '9.0489', caption: "When I lost my job, I realized you don/'t need a pot of gold at the end of the rainbow.")
User.find(4).images.create!(url: 'http://images.nationalgeographic.com/wpf/media-live/photos/000/067/cache/pastoral-landscape_6792_600x450.jpg', lat: '53.3428', long: '6.2661', caption: "When I stood in my ancestor/'s backyard, I realized how deep roots grow.")
User.find(4).images.create!(url: 'http://backroads_web.s3.amazonaws.com/images/trips/2013/slideshowsnew/BIRQ-ireland-biking-7.jpg', lat: '52.6675', long: '8.6261', caption: "When I stepped outside my comfort zone, I realized the grass is always greener on this side.")
User.find(4).images.create!(url: 'http://www.hillwalkireland.com/slider/5_Ireland_Hiking_Trips_West_of_Ireland_Walking_Tours.jpg', lat: '52.7106', long: '8.8784', caption: "When I left the city, I realized peace is precious.")
User.find(4).images.create!(url: 'http://www.brideswithoutborders.com/wp/wp-content/uploads/2011/11/ireland.jpg', lat: '52.0599', long: '9.5072', caption: "When I was alone, I realized how transient life is.")
User.find(5).images.create!(url: 'http://d5qsyj6vaeh11.cloudfront.net/images/homepage/backgrounds/mayo-rainbow_bg.jpg', lat: '53.2734', long: '9.0489', caption: "When I lost my job, I realized you don/'t need a pot of gold at the end of the rainbow.")
User.find(5).images.create!(url: 'http://images.nationalgeographic.com/wpf/media-live/photos/000/067/cache/pastoral-landscape_6792_600x450.jpg', lat: '53.3428', long: '6.2661', caption: "When I stood in my ancestor/'s backyard, I realized how deep roots grow.")
User.find(5).images.create!(url: 'http://backroads_web.s3.amazonaws.com/images/trips/2013/slideshowsnew/BIRQ-ireland-biking-7.jpg', lat: '52.6675', long: '8.6261', caption: "When I stepped outside my comfort zone, I realized the grass is always greener on this side.")
User.find(5).images.create!(url: 'http://www.hillwalkireland.com/slider/5_Ireland_Hiking_Trips_West_of_Ireland_Walking_Tours.jpg', lat: '52.7106', long: '8.8784', caption: "When I left the city, I realized peace is precious.")
User.find(5).images.create!(url: 'http://www.brideswithoutborders.com/wp/wp-content/uploads/2011/11/ireland.jpg', lat: '52.0599', long: '9.5072', caption: "When I was alone, I realized how transient life is.")
