import flask

app = flask.Flask(__name__)

app.config.from_object('trapped.config')

app.config.from_envvar('TRAPPED_SETTINGS', silent=True)

import trapped.api
import trapped.model
import trapped.views