# Generated by Django 4.1.3 on 2022-11-12 19:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='useraccount',
            name='is_staff',
        ),
    ]
