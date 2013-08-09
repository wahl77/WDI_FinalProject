RailsProject::Application.routes.draw do
  post "images/new" => 'images#new', :as => "new_image"

  root :to => 'static_pages#index'

  resources :sessions, only:[:new, :create, :destroy]

  get "profile/:id" => 'users#show', :as => "profile"

end
