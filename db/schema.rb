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
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20181109131407) do

  create_table "bill_histories", force: :cascade do |t|
    t.integer  "paper_id",    limit: 4
    t.integer  "month",       limit: 4
    t.integer  "year",        limit: 4
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "employee_id", limit: 4
  end

  create_table "bills", force: :cascade do |t|
    t.integer  "customer_id", limit: 4
    t.integer  "paper_id",    limit: 4
    t.integer  "month",       limit: 4
    t.integer  "year",        limit: 4
    t.integer  "qunt",        limit: 4
    t.integer  "day",         limit: 4
    t.boolean  "is_paid",                default: false
    t.float    "amount",      limit: 24, default: 0.0
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "customer_papers", force: :cascade do |t|
    t.integer  "customer_id", limit: 4
    t.integer  "paper_id",    limit: 4
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "customers", force: :cascade do |t|
    t.string   "custid",               limit: 255
    t.string   "first_name",           limit: 255
    t.string   "last_name",            limit: 255
    t.string   "middle_name",          limit: 255
    t.text     "address",              limit: 65535
    t.string   "phone_no",             limit: 255
    t.string   "mobile_no",            limit: 255
    t.integer  "employee_id",          limit: 4
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "birthdate",            limit: 255
    t.string   "customer_type",        limit: 255,   default: "Monthly"
    t.integer  "discount",             limit: 4,     default: 0
    t.boolean  "service_charge",                     default: false
    t.integer  "service_charge_field", limit: 4,     default: 10
  end

  create_table "employees", force: :cascade do |t|
    t.string   "name",                  limit: 255
    t.string   "initial",               limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "service_charge",                    default: false
    t.float    "service_charge_amount", limit: 24,  default: 5.0
  end

  create_table "papers", force: :cascade do |t|
    t.string   "name",             limit: 255
    t.string   "initial",          limit: 255
    t.string   "price",            limit: 255
    t.integer  "day",              limit: 4,   default: 1
    t.integer  "qunt",             limit: 4,   default: 1
    t.string   "paper_type",       limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "paper_month_year", limit: 255, default: "Monthly"
  end

end
