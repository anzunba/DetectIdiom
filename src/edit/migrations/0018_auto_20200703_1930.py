# Generated by Django 3.0.6 on 2020-07-03 19:30

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('edit', '0017_auto_20200703_1928'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='language',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='edit.Language'),
        ),
    ]
