# Generated by Django 3.0.6 on 2020-07-01 18:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('edit', '0008_auto_20200701_0314'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='origin_sentence',
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name='article',
            name='translated_sentence',
            field=models.TextField(blank=True),
        ),
    ]
