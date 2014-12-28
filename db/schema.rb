# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20141228165259) do

  create_table "bill_histories", :force => true do |t|
    t.integer  "paper_id"
    t.integer  "month"
    t.integer  "year"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "employee_id"
  end

  create_table "bills", :force => true do |t|
    t.integer  "customer_id"
    t.integer  "paper_id"
    t.integer  "month"
    t.integer  "year"
    t.integer  "qunt"
    t.integer  "day"
    t.boolean  "is_paid",     :default => false
    t.float    "amount",      :default => 0.0
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "customer_papers", :force => true do |t|
    t.integer  "customer_id"
    t.integer  "paper_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "customers", :force => true do |t|
    t.string   "custid"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "middle_name"
    t.text     "address"
    t.string   "phone_no"
    t.string   "mobile_no"
    t.integer  "employee_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "birthdate"
    t.string   "customer_type",  :default => "Monthly"
    t.integer  "discount",       :default => 0
    t.boolean  "service_charge", :default => false
  end

  create_table "employees", :force => true do |t|
    t.string   "name"
    t.string   "initial"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "service_charge",        :default => false
    t.float    "service_charge_amount", :default => 5.0
  end

  create_table "papers", :force => true do |t|
    t.string   "name"
    t.string   "initial"
    t.string   "price"
    t.integer  "day",              :default => 1
    t.integer  "qunt",             :default => 1
    t.string   "paper_type"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "paper_month_year", :default => "Monthly"
  end

end
