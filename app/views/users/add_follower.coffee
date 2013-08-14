
$('#suggested_follow_names').children().remove("#<%= @follow.following_id%>")

$('.follow_link').append("<% @user.followingUsers.each do |following| %> <%= following.username %> </br>
<% end %>")


