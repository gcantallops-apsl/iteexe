# ===========================================================================
# eXe 
# Copyright 2004-2005, University of Auckland
#
# This program is free software; you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation; either version 2 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program; if not, write to the Free Software
# Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
# ===========================================================================

import sys
import logging
import gettext
import tempfile 
import os.path
from exe.engine.package import Package

log = logging.getLogger(__name__)
_   = gettext.gettext


# ===========================================================================
class WebInterface:
    """
    WebInterface is responsible for storing the current root page
    """
    def __init__(self):
        self.rootPage = None
        self.packageStore = None
        self.config = None
 

# nasty old global
g_webInterface = WebInterface()