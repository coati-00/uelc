# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0021_textblockdt_embed'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='textblockdt',
            name='embed',
        ),
    ]