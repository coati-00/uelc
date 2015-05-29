# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('curveball', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='curveballsubmission',
            name='curveball',
            field=models.ForeignKey(blank=True, to='curveball.Curveball', null=True),
            preserve_default=True,
        ),
    ]
