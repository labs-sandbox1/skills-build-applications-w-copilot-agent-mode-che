
from django.core.management.base import BaseCommand
from pymongo import MongoClient

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        client = MongoClient('localhost', 27017)
        db = client['octofit_db']

        # Clear existing data
        db.activities.delete_many({})
        db.leaderboard.delete_many({})
        db.users.delete_many({})
        db.teams.delete_many({})
        db.workouts.delete_many({})

        # Create Teams
        marvel_id = db.teams.insert_one({
            'name': 'Marvel',
            'description': 'Marvel Superheroes'
        }).inserted_id
        dc_id = db.teams.insert_one({
            'name': 'DC',
            'description': 'DC Superheroes'
        }).inserted_id

        # Create Users
        users = []
        users.append(db.users.insert_one({'name': 'Spider-Man', 'email': 'spiderman@marvel.com', 'team_id': marvel_id}).inserted_id)
        users.append(db.users.insert_one({'name': 'Iron Man', 'email': 'ironman@marvel.com', 'team_id': marvel_id}).inserted_id)
        users.append(db.users.insert_one({'name': 'Wonder Woman', 'email': 'wonderwoman@dc.com', 'team_id': dc_id}).inserted_id)
        users.append(db.users.insert_one({'name': 'Batman', 'email': 'batman@dc.com', 'team_id': dc_id}).inserted_id)

        # Create Workouts
        workout1_id = db.workouts.insert_one({'name': 'Cardio Blast', 'description': 'High intensity cardio', 'difficulty': 'Hard'}).inserted_id
        workout2_id = db.workouts.insert_one({'name': 'Strength Training', 'description': 'Build muscle', 'difficulty': 'Medium'}).inserted_id

        # Create Activities
        db.activities.insert_one({'user_id': users[0], 'type': 'Running', 'duration': 30, 'calories': 300, 'date': '2025-11-25'})
        db.activities.insert_one({'user_id': users[1], 'type': 'Cycling', 'duration': 45, 'calories': 400, 'date': '2025-11-25'})
        db.activities.insert_one({'user_id': users[2], 'type': 'Swimming', 'duration': 60, 'calories': 500, 'date': '2025-11-25'})
        db.activities.insert_one({'user_id': users[3], 'type': 'Yoga', 'duration': 50, 'calories': 200, 'date': '2025-11-25'})

        # Create Leaderboard
        db.leaderboard.insert_one({'team_id': marvel_id, 'points': 700})
        db.leaderboard.insert_one({'team_id': dc_id, 'points': 700})

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data using PyMongo.'))
