from django.test import TestCase
from gate_block.models import GateBlock


class GateBlockTest(TestCase):
    def test_add_form(self):
        f = GateBlock.add_form()
        self.assertTrue('body' in f.fields)

    def test_create_from_dict(self):
        d = dict(body='foo')
        tb = GateBlock.create_from_dict(d)
        self.assertEqual(tb.body, 'foo')

    def test_edit_form(self):
        tb = GateBlock.objects.create(body='foo')
        f = tb.edit_form()
        self.assertTrue('body' in f.fields)

    def test_edit(self):
        tb = GateBlock.objects.create(body='foo')
        tb.edit(dict(body='bar'), None)
        self.assertEqual(tb.body, 'bar')

    def test_as_dict(self):
        tb = GateBlock.objects.create(body='foo')
        self.assertEqual(tb.as_dict(), dict(body='foo'))

    def test_summary_render_short(self):
        tb = GateBlock.objects.create(body='foo')
        self.assertEqual(tb.summary_render(), 'foo')

    def test_summary_render_long(self):
        tb = GateBlock.objects.create(body='foo' * 30)
        self.assertTrue(tb.summary_render().endswith("..."))
        self.assertEqual(len(tb.summary_render()), 64)