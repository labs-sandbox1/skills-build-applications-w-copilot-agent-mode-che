from django.test import TestCase
from .models import Team, User, Activity, Workout, Leaderboard

class TeamModelTest(TestCase):
    def test_create_team(self):
        team = Team.objects.create(name="Test Team", description="A test team")
        self.assertEqual(team.name, "Test Team")

class UserModelTest(TestCase):
    def test_create_user(self):
        team = Team.objects.create(name="Test Team")
        user = User.objects.create(name="Test User", email="test@example.com", team=team)
        self.assertEqual(user.name, "Test User")

class ActivityModelTest(TestCase):
    def test_create_activity(self):
        team = Team.objects.create(name="Test Team")
        user = User.objects.create(name="Test User", email="test@example.com", team=team)
        activity = Activity.objects.create(user=user, type="Running", duration=30, calories=200, date="2025-11-26")
        self.assertEqual(activity.type, "Running")

class WorkoutModelTest(TestCase):
    def test_create_workout(self):
        workout = Workout.objects.create(name="Cardio", description="Cardio workout", difficulty="Medium")
        self.assertEqual(workout.name, "Cardio")

class LeaderboardModelTest(TestCase):
    def test_create_leaderboard(self):
        team = Team.objects.create(name="Test Team")
        leaderboard = Leaderboard.objects.create(team=team, points=100)
        self.assertEqual(leaderboard.points, 100)
