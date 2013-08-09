RailsProject::Application.routes.draw do

  match "oauth/callback" => "oauths#callback"
  match "oauth/:provider" => "oauths#oauth", :as => :auth_at_provider

  root :to => 'static_pages#index'

  resources :sessions, only:[:new, :create, :destroy]
end
