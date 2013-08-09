console.log("christina")

$('#user_followers').empty().append("Who you're following: <% @user.followingUsers.each do |following| %> <%= following.username %> </br>
<% end %>")

$('#suggested_follow_names').children().remove("#<%= @follow.following_id%>")
