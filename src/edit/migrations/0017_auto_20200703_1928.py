# Generated by Django 3.0.6 on 2020-07-03 19:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('edit', '0016_auto_20200703_1925'),
    ]

    operations = [
        migrations.CreateModel(
            name='Language',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=15)),
            ],
        ),
        migrations.AlterField(
            model_name='profile',
            name='language',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to='edit.Language'),
        ),
    ]